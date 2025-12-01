import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Page Layout/Layout';

const MainPage = () => {
    const navigate = useNavigate();

    const commands = React.useMemo(() => ({
        ls: {
            description: 'List all pages',
            fn: function () {
                return 'about projects experience';
            },
        },
        about: {
            description: 'Go to About page',
            fn: function () {
                setTimeout(function () {
                    navigate('/about');
                }, 1200);
                return 'Redirecting...';
            },
        },
        projects: {
            description: 'Go to Projects page',
            fn: function () {
                setTimeout(function () {
                    navigate('/projects');
                }, 1200);
                return 'Redirecting...';
            },
        },
        experience: {
            description: 'Go to Experience page',
            fn: function () {
                setTimeout(function () {
                    navigate('/experience');
                }, 1200);
                return 'Redirecting...';
            },
        },
        whoami: {
            description: 'Current user',
            fn: function () {
                return 'KBS';
            }
        },
        date: {
            description: 'Current date',
            fn: function () {
                return new Date().toString();
            }
        },
        pwd: {
            description: 'Print working directory',
            fn: function () {
                return '/home/kbs';
            }
        }
    }), [navigate]);

    return (
        <Layout commands={commands} welcomeMessage="Welcome! Here in the Matrix if you're stuck, you can always use command 'help'">
        </Layout>
    );
};

export default MainPage;
