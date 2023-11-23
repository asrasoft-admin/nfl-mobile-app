import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ErrorBoundaryScreen from './ErrorBoundaryScreen';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by error boundary:', error, errorInfo);
    this.setState({hasError: true});
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error message or UI here
      return <ErrorBoundaryScreen navigation={this.props?.navigation} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
