function ErrorMsg({ errorMsg }: { errorMsg: string | undefined }) {
  if (!errorMsg) {
    return null;
  }

  return (
    <div className='text-error-medium text-sm font-bold'>{errorMsg}</div>
  )
}

export default ErrorMsg;