import {Component} from "react";

class ErrorBoundary extends Component {  //This will handle runtime errors
    constructor() {
   	    super();
        this.state = { error: null, hasError: false };
    }

    componentDidCatch(error,errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    render() {
        if(this.state.errorInfo){
            return (<div style={{flexDirection: 'column',display: 'flex',height: '100vh'}}>
                        <label style={{margin:'auto'}}>
                        
                            Oops, Something went worng, By the time you can play <br />
                            <a href="https://github.com/dhirendrapratapsingh/ArcadeGameCanvasES6"  target="_blank" rel="noopener noreferrer"> Arcade game see if you can cross this river </a>
                            <details style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.error && this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </details>
                        </label>
                    </div>)
        }
        else{
            return (<div>{this.props.children}</div>);
        }

    }
}

export default ErrorBoundary

