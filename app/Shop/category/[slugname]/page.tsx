import { getCategories } from '../../../adminserver/services/category-services'  // فرض می‌کنیم این تابع در این مسیر قرار دارد.
import { notFound } from 'next/navigation';

type CategoryProps = {
  category: { slugname: string; name: string };
};

const CategoryPage = ({ category }: CategoryProps) => {
  if (!category) {
    notFound();
  }

  return (
    <div className='h-[48vh]'>
      <h1 className='pt-6 pr-6'>دسته بندی: {category.name}</h1>
     
    </div>
  );
};

export async function generateStaticParams() {
  try {
    const response = await getCategories();
    const categories = response.data.categories;

    return categories.map((category: { slugname: string }) => ({
      slugname: category.slugname, 
    }));
  } catch (error) {
    console.error("Failed to fetch categories for paths:", error);
    return [];
  }
}

export async function getCategoryData(slugname: string) {
  try {
    const response = await getCategories();
    const categories = response.data.categories;
    const category = categories.find((cat: { slugname: string }) => cat.slugname === slugname);

    return category || null;
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return null;
  }
}

const Page = async ({ params }: { params: { slugname: string } }) => {
  const category = await getCategoryData(params.slugname);

  return <CategoryPage category={category} />;
};

export default Page;
