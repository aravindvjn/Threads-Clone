import Post from "@/components/post/post";
import HomeHeader from "@/components/common/header";
import Suggestions from "@/components/suggestions/suggestions";

export default function HomePage() {
  return (
    <div className="pb-[60px]">
      <HomeHeader />
      <Post />
      <Post />
      <Suggestions />
      <Post />
    </div>
  );
}
