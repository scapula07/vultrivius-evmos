import { type } from "os-browserify"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { getWalletBalance } from "../../api";
import sendIcon from "../../assests/icon/arrow-right-up.png"
import receiveIcon from "../../assests/icon/receive.png"
import AddFundsModal from "../../components/modals/add-funds-modal"
import SendFundsModal from "../../components/modals/send-funds-modal";
import { AccountState, PkState } from "../../recoilstate/globalState";


export default function Wallet() {
  const account = useRecoilValue(AccountState)
  const privatek = useRecoilValue(PkState)
  const [balance, setBalance] = useState(null);
  // console.log('privatek',privatek)


  const [trigger, setTrigger] = useState(false);
  const [showSendFundsModal, setShowSendFundsModal] = useState(false);
  const transactions = [
    {
      type: 'send',
      date: 'dec 20,2022 18:19:38PM',
      amount: "300"
    },
    {
      type: 'receive',
      date: 'dec 20,2022 18:19:38PM',
      amount: "300"
    },
  ]

  const handleShowAddFundsModal = () => setTrigger(true)
  const handleShowSendFundsModal = () => setShowSendFundsModal(true)
  // console.log('wallet address',getWalletBalance('one1tsfdk8spd04pntkk0sf9m3dsxm3exgxtn0dv7w'))


  // const account = new Account(
  //   '45e497bd45a9049bcb649016594489ac67b9f052a6cdf5cb74ee2427a60bf25e',
  //   new Messenger(
  //     new HttpProvider('https://api.s0.b.hmny.io'),
  //     ChainType.Harmony,
  //     ChainID.HmyTestnet,
  //   ),
  // );
  // useEffect(() => {
  //   if (account) {
  //     hmy.blockchain
  //     .getBalance({ address: account })
  //     .then((response) => {
  //       setBalance(fromWei(hexToNumber(response.result), Units.one))
  //     });
  //   }else{
  //     toast.error('Wallet is not connected')
  //   }
  // }, [account])


  return (
    <section>
      <AddFundsModal {...{ trigger, setTrigger }} />
      <SendFundsModal {...{ showSendFundsModal, setShowSendFundsModal, balance }} />
      <div className='pt-4  text-white flex justify-center'>
        <div className='stake-bg flex w-1/2 items-center rounded-lg flex-col py-8'>
          <h5 className='text-slate-400'>Total Balance</h5>
          <h5 className='text-lg font-semibold'>{balance} ONE</h5>

          <div className='flex items-center justify-center space-x-6 pt-4'>
            <button onClick={handleShowAddFundsModal} className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Add funds</button>
            <button onClick={handleShowSendFundsModal} className='btn-color rounded-sm text-black px-2 py-1 text-xs font-semibold'>Send</button>
          </div>

        </div>
      </div>

      {/* transactions */}
      <div className="mt-8">
        <h4 className="capitalize font-medium text-xl leading-[23px]">Transactions</h4>
        <div className="">
          {
            transactions.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-[#353945]">
                <div className="flex items-center space-x-3 py-[19px]">
                  <img src={item.type.toLowerCase() === 'send' ? sendIcon : receiveIcon} alt="" />
                  <div className="">
                    <p className='capitalize text-[#F5F5F5] text-2xl leading-7'>{item.type}</p>
                    <p className='capitalize text-lightdark text-sm leading-4 mt-[6px]'>{item.date}</p>
                  </div>
                </div>
                <div>
                  <p className='capitalize text-[#F5F5F5] text-2xl leading-7'>{item.type.toLowerCase() === 'send' ? '-' : null}{item.amount}ONE</p>
                  <p className='capitalize text-lightdark text-sm leading-4 mt-[6px] flex justify-end'>{item.amount}ONE</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
