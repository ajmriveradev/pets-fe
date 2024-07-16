import { redirect } from 'next/navigation'

const Home = () => {
  redirect('/user/list');
  
  return (
    <div className="h-full bg-slate-50">
      Home
    </div>
  );
}

export default Home;