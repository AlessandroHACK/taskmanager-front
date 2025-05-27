

export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-center text-red-600 font-bold  uppercase text-sm">
      {children}
    </div>
  )
}
