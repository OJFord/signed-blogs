"""
Envelope is an AWS-Lambda-driven service that renders log posts signed using
Keybase.io File System (KBFS).
"""
import logging
import requests
from lxml import html


def list_letters(user):
    """Lists all letters available from a user"""
    response = requests.get(
        'https://keybase.pub/{user}/envelope'.format(user=user)
    )
    tree = html.fromstring(response.content)
    letters = tree.xpath('//div[@class="directory"]//a[@class="file"]/text()')

    return """
    <html>
    <head>
        <title>{user}'s posts</title>
    </head>
    <body>
        <ul>
            <li>{posts}</li>
        </ul>
    </body>
    </html>
    """.format(user=user, posts=("</li><li>".join(letters)))


def read_letter(user, title):
    """Retrieves a single letter from a user"""
    response = requests.get(
        'https://{user}.keybase.pub/envelope/{title}'.format(
            user=user,
            title=title
        )
    )
    return response.content


def handler(event, _):
    """Handle incoming requests from API GW"""
    logging.debug(event)

    title = event.get('title')
    user = event.get('user')

    if title is not None:
        return read_letter(user, title)
    else:
        return list_letters(user)
