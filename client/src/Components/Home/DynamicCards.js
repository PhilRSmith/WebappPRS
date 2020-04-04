import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
		Grid,
		Card,
		CardContent,
		Typography,
		CardHeader
	} from '@material-ui/core/'
import {Link} from 'react-router-dom';	
	
	class DynamicCards extends React.Component{ 
		constructor(props) {
			super(props);
			this.state = {
				imagedesc: {
					display: "flex"
				},
				useStyles : {
					
						padding: 5,
                        width: "100%",
                        height: "100%",
						zindex: '10'
					
				}
		   }
		}

		

		render(){
			return (
				<React.Fragment>
					<div className='Cards' style={this.state.useStyles}>
						<Grid
							container
							spacing={1}
							direction="row"
							justifycontent="flex-start"
							alignItems="flex-start"	
						>
							{this.props.passDataToDynamicCards.map(elem => (
								<Grid item xs={12} sm={12} md={12} key={this.props.passDataToDynamicCards.indexOf(elem)}>
									<Card>
										<CardHeader
											title = {<Link to={`/Read/${elem.issue}`}> {`${elem.title}`} </Link>}
										/>
										<CardContent>
											<Typography  component={'span'}>
												<div className="container" style={this.state.imagedesc}>
												<img src= {elem.img_url} width = "100%" alt = 'empty' />
												</div>
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							
							 ) ) } 	
						</Grid> 
					</div>
					
				</React.Fragment>
			)
		}
	}

export default DynamicCards