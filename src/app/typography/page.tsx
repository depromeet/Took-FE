import { Typography } from '@/shared/ui/typography'

const TestPage = () => {
  return (
    <div>
      <div className='flex flex-col gap-4 mt-10'>
        <div>### title</div>
        <div className='text-title-1'>세민이는 타이틀은 멋졍</div>
        <div className='text-title-2'>세민이는 타이틀은 멋졍</div>
        <div className='text-title-3'>세민이는 타이틀은 멋졍</div>
        <div className='text-title-3'>세민이는 타이틀은 멋졍</div>

        <div>### body</div>
        <div className='text-body-1'>세민이는 바디는 멋졍</div>
        <div className='text-body-2'>세민이는 바디는 멋졍</div>
        <div className='text-body-3'>세민이는 바디는 멋졍</div>

        <div>### caption</div>
        <div className='text-caption-1'>세민이는 캡션은 멋졍</div>
        <div className='text-caption-2'>세민이는 캡션은 멋졍</div>
      </div>

      <div className='flex flex-col gap-4 mt-10'>
        <Typography variant='title-1'>세민이는 타이틀은 멋졍</Typography>
        <Typography variant='title-2'>세민이는 타이틀은 멋졍</Typography>
        <Typography variant='title-3'>세민이는 타이틀은 멋졍</Typography>

        <Typography variant='body-1'>세민이는 바디는 멋졍</Typography>
        <Typography variant='body-2'>세민이는 바디는 멋졍</Typography>
        <Typography variant='body-3'>세민이는 바디는 멋졍</Typography>

        <Typography variant='caption-1'>세민이는 캡션은 멋졍</Typography>
        <Typography variant='caption-2'>세민이는 캡션은 멋졍</Typography>
      </div>


    </div>
  )
}

export default TestPage