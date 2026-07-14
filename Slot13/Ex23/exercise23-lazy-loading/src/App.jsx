import { Suspense, lazy, useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "./api";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import "./style.css";

const User = lazy(() => import("./components/User"));
const Post = lazy(() => import("./components/Post"));

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [userData, postData] = await Promise.all([
          fetchUsers(),
          fetchPosts(),
        ]);

        setUsers(userData);
        setPosts(postData);
      } catch (err) {
        setError("Không thể tải dữ liệu từ API.");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  if (loadingData) {
    return <LoadingSpinner text="Loading data..." />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Header />

      <main className="container">
        <h1>Exercise 23: Lazy Loading Demo</h1>

        <section id="users">
          <h2>Users</h2>

          <Suspense fallback={<LoadingSpinner text="Loading User component..." />}>
            <div className="grid">
              {users.map((user) => (
                <User key={user.id} user={user} />
              ))}
            </div>
          </Suspense>
        </section>

        <section id="posts">
          <h2>Posts</h2>

          <Suspense fallback={<LoadingSpinner text="Loading Post component..." />}>
            <div className="grid">
              {posts.slice(0, 10).map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </div>
          </Suspense>
        </section>
      </main>
    </>
  );
}

export default App;