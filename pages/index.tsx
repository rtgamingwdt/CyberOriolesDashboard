import { useSession, signIn } from "next-auth/react"
import { useState } from 'react';
import Sidebar from '../components/nav/Sidebar';
import CreateNews from '../components/news/CreateNews';
import EditNews from '../components/news/EditNews';
import dotenv from "dotenv";
import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DeleteNewsConfirmation from "../components/news/DeleteNewsConfirmation";
import Constants from "../Constants";

const Home = (props: any) => {

  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [setting, setSetting] = useState("");

  const [showCreateNews, setShowCreateNews] = useState(false);
  const [showEditNews, setShowEditNews] = useState(false);
  const [showDeleteNews, setShowDeleteNews] = useState(false);

  const handleSubmit = (e: any) => {
    console.log(username, password);
    signIn("login", { redirect: false, username: username, password: password });
    e.preventDefault();
  }

  const handleNewsEditClick = (id: string, title: string, description: string) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setShowEditNews(true)
  }

  const handleNewsDeleteClick = async (id: string) => {
    setId(id);
    setShowDeleteNews(true);
  }

  if(typeof window !== 'undefined') {
    document.addEventListener('keyup', (e) => {
      if(e.key == "Escape") {
        setShowCreateNews(false);
        setShowDeleteNews(false);
        setShowEditNews(false);
      }
    })
  }

  if (!session) {
    return (
      <div className='flex h-screen w-screen justify-center items-center select-none'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='w-[70vw] h-[70vh] bg-stone-900 rounded-lg'>
            <h1 className='text-[4.5vh] text-center text-white border-b rounded-md'>Login</h1>
            <div className='flex flex-col gap-5 h-[calc(60vh-4.5vh)] justify-center items-center'>
              <label className='flex flex-col justify-center items-center'>
                <span className='text-white'>Username</span>
                <input className='w-[20vw] h-[5vh] pl-[1vw] pt-[1vw] pr-[1vw] pb-[1vw] rounded-md bg-stone-800 text-white outline-none' value={username} type={"text"} id="username" name='username' onChange={(e) => setUsername(e.target.value)} />
              </label>
              <label className='flex flex-col justify-center items-center'>
                <span className='text-white'>Password</span>
                <input className='w-[20vw] h-[5vh] pl-[1vw] pt-[1vw] pr-[1vw] pb-[1vw] rounded-md bg-stone-800 text-white outline-none' value={password} type={"password"} id="password" name='password' onChange={(e) => setPassword(e.target.value)} />
              </label>
              <button type='submit' className='bg-orange-500 pl-[2vw] pt-[1vh] pr-[2vw] pb-[1vh] rounded-md'>Login</button>
            </div>
            <div>
            </div>
          </div>
        </form>
      </div>
    )
  } else {
    return (
      <div className='select-none'>
        <Sidebar />
        <div className='w-[100vw]'>
          <div className='flex justify-center items-center h-screen'>
            <div className='flex w-[80vw] bg-stone-900 rounded-lg'>
              <div className='pl-[1vw] pt-[1vw] pr-[1vw] pb-[1vw]'>
                <div className='w-[5vw] flex flex-col gap-2 text-white h-[80vh] border-r border-stone-800 rounded-sm items-center pr-[1vw]'>
                  <span className='pl-[1vw] pr-[1vw] hover:text-orange-600 hover:bg-black cursor-pointer rounded-md'>News</span>
                </div>
              </div>
              <div>
                <div className='w-[72vw] flex justify-center border-b h-fit border-b-stone-800 rounded-lg'>
                  <span className='text-[5vh] h-fit text-white'>News</span>
                </div>
                <div>
                  <div className='flex justify-center gap-2 mt-[1vh] mb-[1vh]'>
                    <button className='bg-orange-600 pl-[1vw] pt-[1vh] pr-[1vw] pb-[1vh] rounded-full' onClick={() => setShowCreateNews(true)}>Create</button>
                  </div>
                  <CreateNews onClose={() => setShowCreateNews(false)} show={showCreateNews} />
                  <EditNews onClose={() => setShowEditNews(false)} show={showEditNews} id={id} titlePlaceholder={title} descriptionPlaceholder={description} />
                  <DeleteNewsConfirmation onClose={() => setShowDeleteNews(false)} show={showDeleteNews} id={id} />
                  <div className='flex flex-col gap-1'>
                    {props.news.length > 0 ?
                      props.news.map((res: any) =>
                        <div key={res._id} className="group flex bg-black rounded-md pl-[1vw] pr-[1vw]">
                          <details className='text-white w-[50vw]'>
                            <summary className="flex items-center gap-2">
                              {res.title}
                              <AiFillEdit className="hover:cursor-pointer" onClick={(e) => handleNewsEditClick(res._id, res.title, res.description)} />
                              <BsFillTrashFill className="hover:cursor-pointer" onClick={(e) => handleNewsDeleteClick(res._id)} />
                            </summary>
                            {res.description}
                          </details>
                        </div>
                      ) :
                      <div className="flex justify-center items-center h-[60vh] text-white">
                        <span className="text-[5vh]">No News</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export async function getServerSideProps(context: any) {
  dotenv.config();
  let news;
  await fetch(`${Constants.SERVER.URL}/api/getNews`).then(async (res) => {
    news = await res.json();
  })

  return {
    props: { news }
  }
}

export default Home
