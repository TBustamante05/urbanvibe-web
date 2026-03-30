type Props = {
  children: React.ReactNode;
}

function AuthLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-13">
      <div className="py-24 px-32 ">
        <h1 className="font-bold uppercase text-2xl">UrbanVibe</h1>
        <div className="mt-14">
          <h1 className="mb-20 text-4xl font-semibold">Welcome to UrbanVibe</h1>
          <p className="mb-8">Login to with your account or create a new one to be part of our community!</p>
          {children}
        </div>
      </div>
      <div className="w-full lg:h-screen ">
        <img className="w-full h-full object-cover" src="/wcImg.jpg" alt="" />
      </div>
    </div>
  )
}

export default AuthLayout