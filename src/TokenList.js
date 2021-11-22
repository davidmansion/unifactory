import { useState, useEffect } from 'react'
import {
  Button,
  InputGroup,
  FormControl,
  Row,
  Col,
  Alert,
  ListGroup,
} from 'react-bootstrap'
import { getData } from './utils'

export function TokenList(props) {
  const [pending, setPending] = useState(false)
  const [tokensDataHash, setTokensDataHash] = useState('')
  const [tokensData, setTokensData] = useState([])

  const updateListHash = (event) => setTokensDataHash(event.target.value)

  const loadTokenList = async () => {
    setPending(true)

    if (tokensDataHash) {
      try {
        const tokensData = await getData(tokensDataHash)

        if (tokensData) {
          setTokensData(tokensData)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setPending(false)
      }
    }
  }

  return (
    <section>
      <InputGroup className="mb-3" disabled={pending}>
        <FormControl
          placeholder="Token list CID"
          aria-label="Token list CID"
          onChange={updateListHash}
        />
        <Button
          variant="primary"
          onClick={loadTokenList}
          disabled={!tokensDataHash || pending}
        >
          {pending ? 'Pending...' : 'Load a token list'}
        </Button>
      </InputGroup>

      {tokensData?.tokens?.length ? (
        <ListGroup
          className={`${tokensData.tokens.length > 8 ? 'scrollableList' : ''}`}
        >
          {tokensData.tokens.map((item, index) => {
            const { name, address } = item

            return (
              <ListGroup.Item key={index} variant="light">
                <b>{name}</b>: {address}
              </ListGroup.Item>
            )
          })}
        </ListGroup>
      ) : (
        <Alert variant="secondary">No token list</Alert>
      )}
    </section>
  )
}
