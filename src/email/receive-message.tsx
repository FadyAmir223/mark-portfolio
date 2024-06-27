import {
  Body,
  Font,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components'

type ReceiveMessageProps = {
  email: string
  message: string
}

export default function ReceiveMessage({
  email,
  message,
}: ReceiveMessageProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Roboto'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>
        {email} says: {message}
      </Preview>
      <Tailwind>
        <Body className='bg-white'>
          <Text className='text-xl text-black'>{email}</Text>
          <span>says:</span>
          <Text className='mt-6 text-lg text-black'>{message}</Text>
        </Body>
      </Tailwind>
    </Html>
  )
}

ReceiveMessage.PreviewProps = {
  email: 'test@gmail.com',
  message: 'Hello, I like your work and hope to work together in the future',
} as ReceiveMessageProps
