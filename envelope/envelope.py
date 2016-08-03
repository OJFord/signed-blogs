import logging
from os import environ


logger = logging.getLogger()
logger.setLevel(logging.DEBUG if environ.get('DEBUG') else logging.WARN)


def list_letters(event, ctxt):
    """Lists all letters available from a user"""
    return 'Letters from {}'.format(event['user'])


def read_letter(event, ctxt):
    """Retrieves a single letter from a user"""
    return 'Letter titled {} from {}'.format(
        event['user'], event['title']
    )


def handler(event, ctxt):
    logging.debug(event)
    if event.get('title') is not None:
        return read_letter(event, ctxt)
    else:
        return list_letters(event, ctxt)
