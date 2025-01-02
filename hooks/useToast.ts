import { toast } from 'react-hot-toast';


const useToast = () => {
    const showSuccess = (message: string): void => {
        if (!message) {
            console.warn('No success message provided to showSuccess');
            return;
        }

        toast.success(message, {
            position: 'top-right',
            style: {
                backgroundColor: 'green',
                color: 'white',
            },
        });
    };

    const showError = (message: string): void => {
        if (!message) {
            console.warn('No error message provided to showError');
            return;
        }

        toast.error(message, {
            position: 'top-right',
            style: {
                backgroundColor: 'red',
                color: 'white',
            },
        });
    };

    return { showSuccess, showError };
};

export default useToast;