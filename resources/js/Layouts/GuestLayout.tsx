import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-5 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo 
                        className="h-20 w-20 fill-current text-gray-500"
                        style={{ width: '200px', height: '200px', display: 'block', margin: '0 auto' }}
                    />
                </Link>
            </div>

            <div className="w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
