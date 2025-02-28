import { Component, ErrorInfo, ReactNode } from 'react';
import { sendErrorReport } from '../services/emailService';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  email: string;
  message: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      email: '',
      message: '',
      isSubmitting: false,
      isSubmitted: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    
    try {
      await sendErrorReport({
        email: this.state.email,
        message: this.state.message,
        errorMessage: this.state.error?.message || 'Unknown error',
        errorStack: this.state.error?.stack || 'No stack trace',
        componentStack: this.state.errorInfo?.componentStack || 'No component stack',
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      
      this.setState({ isSubmitted: true, isSubmitting: false });
    } catch (error) {
      console.error('Failed to submit error report:', error);
      this.setState({ isSubmitting: false });
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
          <div className="w-full max-w-md p-6 rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] bg-background shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-primary)]">Unexpected Error... Try refreshing the page.</h2>
            <p className="mb-6">
              Sorry about this, i guess my code is not as good as i thought.<br />
              <span className="text-red-500">PLEASE SUBMIT THIS SO I CAN FIX IT!!!</span>
            </p>
            
            {this.state.isSubmitted ? (
              <div className="text-center p-4 bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] rounded-md">
                <p className="font-medium">Thank you for your report!</p>
                <p className="mt-2">We'll look into this issue as soon as possible.</p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[color-mix(in_oklch,var(--color-primary)_80%,black)] transition-colors"
                >
                  Return to Home
                </button>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email (optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className="w-full p-2 rounded-md border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] bg-background"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Please tell me everything so i can fix this error. What were you doing when the error occurred?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    rows={4}
                    className="w-full p-2 rounded-md border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] bg-background"
                    placeholder="I was trying to..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={this.state.isSubmitting}
                  className="w-full py-2 px-4 bg-[var(--color-primary)] text-white rounded-md hover:bg-[color-mix(in_oklch,var(--color-primary)_80%,black)] transition-colors disabled:opacity-50"
                >
                  {this.state.isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
                
                <div className="text-xs opacity-75 mt-4">
                  <p>Error details will be included automatically with your report.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 