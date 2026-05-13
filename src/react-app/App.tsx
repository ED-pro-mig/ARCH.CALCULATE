import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { ThemeProvider } from "@/react-app/hooks/theme-provider";
import { CalculatorProvider } from "@/react-app/hooks/calculator-provider";
import Layout from "@/react-app/components/Layout";
import Landing from "@/react-app/pages/Landing";
import Constructor from "@/react-app/pages/Constructor";
import Summary from "@/react-app/pages/Summary";

export default function App() {
  return (
    <ThemeProvider>
      <CalculatorProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/constructor" element={<Constructor />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </CalculatorProvider>
    </ThemeProvider>
  );
}
