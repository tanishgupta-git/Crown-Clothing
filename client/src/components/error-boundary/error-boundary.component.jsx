import React from 'react';
import { ErrorImageOverlay,ErrorImageContainer,ErrorImageText} from './error-boundary.styles';
class ErrorBoundary extends React.Component {
    constructor() {
      super();
      this.state = {
          hasErrored : false
      }
    }
    // this method let us aware about any error happen in child component 
    static getDerivedStateFromError(error) {
        // process the error 
        return { hasErrored : true}
    }

    componentDidCatch(error,info) {
        console.log(error)
    }

    render() {
        if(this.state.hasErrored) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
                    <ErrorImageText>Sorry This Page Is Broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;