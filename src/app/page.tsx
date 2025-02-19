import Post from "@/components/post/post";
import ProfileHead from "@/components/profile/profile-head";
import HomeHeader from "@/components/common/header";
import Suggestions from "@/components/suggestions/suggestions";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <Post />
      <Post />
      <Suggestions />
      <Post />
    </div>
  );
}
