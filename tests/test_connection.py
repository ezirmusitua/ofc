from urllib.request import urlopen


def test_connection():
    print('Testing connection ... ')
    assert b'hello' in urlopen('http://localhost:5000/ping').read(), 'Error Connection'
    print('Connected !')


if __name__ == '__main__':
    test_connection()
