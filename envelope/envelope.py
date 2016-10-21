"""
Envelope is an AWS-Lambda-driven service that renders log posts signed using
Keybase.io File System (KBFS).
"""
import logging


def list_letters(event, _):
    """Lists all letters available from a user"""
    return 'Letters from {}'.format(event['user'])


def read_letter(event, _):
    """Retrieves a single letter from a user"""
    return 'Letter titled {} from {}'.format(
        event['user'], event['title']
    )


def handler(event, ctxt):
    """Handle incoming requests from API GW"""
    logging.debug(event)
    if event.get('title') is not None:
        return read_letter(event, ctxt)
    else:
        return list_letters(event, ctxt)
