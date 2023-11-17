import { ReactNode } from 'react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface MainLayoutProps {
    children?: ReactNode;
}

export function MainLayout(props: MainLayoutProps) {

    return (
        <div>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    );
}