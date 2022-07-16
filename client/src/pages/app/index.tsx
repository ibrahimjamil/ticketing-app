import React from 'react';
import Head from 'next/head';
import { 
	BrowserRouter as Router,
	Switch as Routes,
	Route,
	Redirect
 } from 'react-router-dom';
import AuthGuard from '../../guards/authGuard';
import Admin from '../../container/Admin';

type UserType = {
	email: string;
	error: boolean;
	_id: number;
	userType: string;
}


const AppIndex = () => {
	
	return (
		<Router>
			<Head>
        		<title>Ticketing</title>
      		</Head>
			<AuthGuard>
				{(user: UserType)=>{
					return (
						<Routes>
							{user.userType === 'admin' && (
								<Route key="admin" path={'/app/admin'}>
									<Admin/>
								</Route>
							)}
							{user.userType === 'noice' && (
								<Route key="noice" path={'/app/noice'}>
									<h1>simple User Site</h1>
								</Route>
							)}
							<Redirect
								to={user.userType === 'admin' ? '/app/admin' : '/app/noice'}
							/>
						</Routes>
					);
				}}
			</AuthGuard>
		</Router>
	);
};

export default AppIndex;
