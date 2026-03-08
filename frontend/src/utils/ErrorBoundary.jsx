import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the UI can show a fallback
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // You can log the error to an error reporting service
        console.error("Error Boundary Caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center p-10">
                    <h1 className="text-2xl font-bold text-red-500">Oops! Something broke 😢</h1>
                    <p className="text-gray-600 mt-2">Try refreshing the page.</p>
                </div>
            );
        }


        return this.props.children;
    }
}

export default ErrorBoundary;
