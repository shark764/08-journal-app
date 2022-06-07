import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import store from './store/store';
import './styles/styles.scss';

const JournalApp = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default JournalApp;
