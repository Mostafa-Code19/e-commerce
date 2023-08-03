export { default } from 'next-auth/middleware'

export const config = {
   matcher: [
      '/admin/:path*',
      '/profile/edit',
      '/profile/orders'
   ],
}
