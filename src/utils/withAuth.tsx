import { useFirebase } from 'context/firebase'
import { useRouter } from 'next/router'
import isServer from './IsServer'

const withAuth = (page: () => JSX.Element) => {
	const { user, isFetchingUser, error } = useFirebase()
	const router = useRouter()

	if (isFetchingUser || isServer()) {
		return <h2>"loading ... "</h2>
	}

	if (user) {
		return page()
	}

	router.push(`/login?next=${router.asPath}`)
}

export default withAuth
