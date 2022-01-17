import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MailsProvider } from '../store/mailsStore';

function MyApp({ Component, pageProps }) {

  return (
      <MailsProvider>
          <Component {...pageProps} />
      </MailsProvider>
  )
}

export default MyApp
