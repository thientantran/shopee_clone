import { Link } from 'react-router-dom'

export default function RatingStar() {
  return (
    <ul className='my-3'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li key={index} className='py-1 pl-2'>
            <Link to='/' className='flex items-center text-sm'>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='mr-1 h-4 w-4 fill-orange'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' href='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              <span>Tro len</span>
            </Link>
          </li>
        ))}
    </ul>
  )
}
