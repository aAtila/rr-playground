import { Link } from "react-router";
import Button from "./components/ui/button";
function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Link to="/create-ad">
          <Button>Create Ad</Button>
        </Link>
      </div>
    </>
  );
}

export default App;
