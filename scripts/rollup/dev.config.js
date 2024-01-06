// import reactDomConfig from './react-dom.config';
// import reactNoopRendererConfig from './react-noop-renderer.config';
import reactConfig from './react.config';

// , ...reactDomConfig
// , ...reactNoopRendererConfig
export default () => {
	return [...reactConfig];
};
