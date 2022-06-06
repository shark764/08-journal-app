import { Navigate, Route, Routes } from 'react-router-dom';
import JournalScreen from '@/components/journal/JournalScreen';

const JournalRouter = () => (
  <div className="journal__main">
    <Routes>
      {/* <Route path="*" element={<JournalScreen />} /> */}
      <Route index element={<JournalScreen />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  </div>
);

export default JournalRouter;
