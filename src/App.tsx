import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogTemplate from "./pages/BlogTemplate";
import Contact from "./pages/contact";
import Learnings from "./pages/Learnings";
import MinimalHTMLTutorialPage from "./pages/Learnings/TutorialPage_template";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learnings" element={<Learnings />} />
          <Route path="/blog/:title" element={<BlogTemplate />} />

          {/* learnings pages */}
          <Route path="/learnings/HTML" element={<MinimalHTMLTutorialPage />} />
          <Route path="/learnings/CSS" element={<Learnings />} />
          <Route path="/learnings/JavaScript" element={<Learnings />} />
          <Route path="/learnings/React" element={<Learnings />} />
          <Route path="/learnings/C#" element={<Learnings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
