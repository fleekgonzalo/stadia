import stadiaLogo from '../assets/stadia_logo.png'

export default function Hero() {
  return (
    <div className="hero min-h-screen  bg-base-200" >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
      
        <div className="max-w-md">
        <figure  className="px-10 pt-10"><img src={stadiaLogo} className="mx-auto rounded-xl w-40" alt="logo" /></figure>
          <h1 className="mb-5 text-5xl font-bold mt-10">Stadia NIL</h1>
          <p className="mb-5">Dynamic and Hybrid Blockchain Credentials (Digital Diploma, Scholarship, NIL Offerings)</p>
          
        </div>
      </div>
    </div>
  )
}