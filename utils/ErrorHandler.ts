import { toast } from 'react-hot-toast';

export const ErrorHandler = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message, {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
    } else {
        toast.error('An unexpected error occurred.', {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white'
            }
        });
    }
};