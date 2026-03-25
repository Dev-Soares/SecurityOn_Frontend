interface ErrorTextProps {
    message?: string;
}

const ErrorText = ({ message }: ErrorTextProps) => {
    if (!message) return null;

    return <p className="text-red-500 text-sm">{message}</p>;
};

export default ErrorText;
