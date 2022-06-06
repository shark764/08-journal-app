import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRouter from './AuthRouter';
import JournalRouter from './JournalRouter';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/*" element={<JournalRouter />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
