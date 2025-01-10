import { toast } from 'react-hot-toast';

export const ErrorHandler = (error: unknown): void => {
    console.log("Handled Error Object:", error); // baraye debug kardan

    if (error instanceof Error) {
        toast.error(error.message || 'An error occurred.', {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white',
            },
        });
    } else if (typeof error === 'string') {
        toast.error(error, {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white',
            },
        });
    } else {
        toast.error('An unexpected error occurred.', {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white',
            },
        });
    }
};