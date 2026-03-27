"use client";
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
 children: ReactNode;
 fallback?: ReactNode;
}

interface State {
 hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
 constructor(props: Props) {
  super(props);
  this.state = { hasError: false };
 }

 static getDerivedStateFromError(): State {
  return { hasError: true };
 }

 componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  console.error('Uncaught error:', error, errorInfo);
 }

 render() {
  if (this.state.hasError) {
   return (
    this.props.fallback || (
     <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
      <h2 className="text-xl font-bold text-theme-primary mb-2">
       Something went wrong
      </h2>
      <p className="text-white mb-4">Please try refreshing the page</p>
      <button
       onClick={() => this.setState({ hasError: false })}
       className="bg-theme-primary text-theme-background px-4 py-2 rounded-lg"
      >
       Try again
      </button>
     </div>
    )
   );
  }

  return this.props.children;
 }
}

export default ErrorBoundary;
