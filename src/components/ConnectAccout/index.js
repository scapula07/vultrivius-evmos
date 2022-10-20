import React ,{useState} from 'react'
import "./connect.css"
import Modal from '../Modal'
import {AiOutlineCloseCircle} from "react-icons/ai"
import metamaskImg from "../../assests/metamask.png"
import { connectHarmony } from '../../HarmonySdkHelpers'
import { AccountState,  PkState} from '../../recoilstate/globalState'
import { useRecoilState } from 'recoil'
import Avater from "../../assests/profileAvater.png"
import { Link } from 'react-router-dom'

export default function ConnectAccount() {
    const [trigger,setTrigger] =useState(false)
    const [Wallet,setWallet]=useState("")
    const [privatek,setPk]=useRecoilState(PkState)
    const [account,setAccount]=useRecoilState(AccountState)

    console.log(privatek)
     const connectWallet=async()=>{
       
        const res=await connectHarmony(privatek)
        console.log(res?.defaultSigner,"harmonney key")
        setAccount(res?.defaultSigner)
        setWallet("")
        setTrigger(false)
      }
  return (
    <>   
    {account?.length===0&&
         <button className='py-1 px-4 text-xs  text-black btn-color border border-slate-400 rounded-full hover:bg-rose-400 hover:border-0'
            onClick={()=>setTrigger(true)}
        >
         Connect Wallet
        </button>
       }

    {account?.length>1&&
         <Link to="/profile"
         state={{
          account
            }}
           >
            <button className='py-1 px-4 text-xs flex items-center space-x-2 text-white stake-bg border border-slate-400 rounded-full hover:btn-color hover:border-0'
            
             >
            <img src={Avater} alt="" />
           <span>{ account.slice(0,9)+"..."}</span>
           </button>
       </Link>
       }
        <Modal trigger={trigger} cname="h-80 w-2/5 shadow rounded-lg py-4 px-8"> 
            
        <div className='connect-modal '>
               <main className='flex justify-end'>
                 <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
                </main>

                <main className='flex flex-col items-center space-y-2'>
                    <h5 className='text-2xl font-semibold text-white'>Connect Wallet</h5>
                    <p className='text-slate-700'>Link your wallet and account to continue</p>
                </main>

                <main className='flex flex-col space-y-4 pt-4'>
                    {Wallet===""&&
                    <>
                   <div className='flex  space-x-2 items-center wallet-bg py-4 px-4 rounded-sm'>
                    <img src={metamaskImg} className="" alt='' />
                    <main>
                        <h5 className='font-semibold text-sm text-slate-300'>Metamask</h5>
                        <p className='text-xs text-slate-700'>The popular crypto wallet is secure and flexible</p>
                    </main>
                   </div>

                   <div className='flex space-x-2 items-center wallet-bg py-4 px-4 rounded-sm '
                     onClick={()=>setWallet("otherWallets")}
                    >
                    <h5 className='bg-white'>
                     <img src="https://algorand-governance-platform-web.s3.amazonaws.com/static/media/Other.eac2bef4.svg" alt='' className=''/>
                    </h5>
                    <main>
                      <h5 className='font-semibold text-sm text-slate-300'>Other wallets</h5>
                      <p className='text-xs text-slate-700'>The popular crypto wallet is secure and flexible</p>
                     </main>
                   </div>
                   </>
                      }

                    {Wallet==="otherWallets"&&
                       <main className='flex flex-col space-y-4'>
                        <div className='flex  space-x-2 items-center wallet-bg py-4 px-4 rounded-sm'>
                          <input
                           className='w-full h-full outline-none py-1 wallet-bg text-slate-300 border-0'
                           placeholder='Paste your private keys '
                           onChange={(e)=>setPk(e.target.value)}
                           />
                        </div>

                        <button className='py-1 px-4 text-xs w-20  text-black btn-color border border-slate-400 rounded-full hover:bg-rose-400 hover:border-0'
                          onClick={connectWallet}
                             >
                          Connect
                        </button>
                       </main>

                    }
                </main>

      </div>
        </Modal>
    </>
  )
}
