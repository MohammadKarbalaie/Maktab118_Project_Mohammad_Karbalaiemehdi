import { toast } from 'react-hot-toast';

const useToast = () => {
    const showSuccess = (message: string) => {
        toast.success(message, {
            position: 'top-right',
            style: {
                backgroundColor: 'green',
                color: 'white'
            }
        });
    };

    const showError = (message: string) => {
        toast.error(message, {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
    };

    return { showSuccess, showError };
};

export default useToast;