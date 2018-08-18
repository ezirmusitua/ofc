from setuptools import setup

setup(
    name='csv2excel',
    version='0.1.0',
    description='Online csv to excel file converter',
    author='ezirmusitua',
    author_email='jferroal@gmail.com',
    packages=['csv2excel', 'tests'],
    include_package_data=True,
    install_requires=[
        'flask>=1.0.2',
        'xlwt>=1.3.0'
    ],
    classifiers=[
        'Programming Language :: Python :: 3.6',
    ]
)
