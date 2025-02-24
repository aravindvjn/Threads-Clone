import React from 'react'
import Post from '../post/post'
import { ThreadWithRepliesType } from './type'
import SingleComment from '../comment/single-comment'

const SingleThreadReplies = ({reply}:{reply:ThreadWithRepliesType}) => {
  return (
    <div >

        <Post noHR {...reply} />

        <p className="pl-[10px] font-semibold text-[18px] opacity-60">Replies : </p>

        <div className="pl-[10px] pb-[10px] flex">
          <div className="w-[3px] rounded-full bg-foreground opacity-30"></div>

          <div>
            {reply?.replies?.map((rep) => (
              <SingleComment key={rep.id} {...(rep as any)} />
            ))}
          </div>
          
        </div>

        <hr className="opacity-60 text-foreground pb-[10px]" />

      </div>
  )
}

export default SingleThreadReplies
