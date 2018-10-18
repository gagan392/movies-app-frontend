import React, { Component } from "react";
import './Home.css';
import Header from '../../common/Header/Header';
import { withStyles } from "@material-ui/core/styles";
import moviesData from "../../common/movieData";
import genres from "./../../common/genres";
import artists from "./../../common/artists";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Input from "@material-ui/core/Input";
import InputLabel from '@material-ui/core/InputLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Checkbox, ListItemText } from "@material-ui/core";

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	},
	upcomingMoviesHeading: {
		textAlign: 'center',
		background: '#ff9999',
		padding: '8px',
		fontSize: '1rem'
	},
	gridListUpcomingMovies: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		width: '100%'
	},
	gridListReleasedMovies: {
		transform: 'translateZ(0)',
		cursor: 'pointer'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 240,
		maxWidth: 240
	},
	title: {
		color: theme.palette.primary.light,
	}
});

class Home extends Component {

	constructor() {
		super();
		this.state = {
			movieName: "",
			genres: [],
			artists: []
		}
	}
	movieNameChangeHandler = e => {
		this.setState({
			movieName: e.target.value
		});
	}

	genreChangeHandler = e => {
		this.setState({
			genres: e.target.value
		});
	}

	artistChangeHandler = e => {
		this.setState({
			artists: e.target.value
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Header />
				<div className={classes.upcomingMoviesHeading}>
					<span>Upcoming Movies</span>
				</div>
				<GridList cols={5} className={classes.gridListUpcomingMovies}>
					{moviesData.map(movieData =>
						<GridListTile key={movieData.id}>
							<img src={movieData.poster_url} alt={movieData.title} />
							<GridListTileBar title={movieData.title} />
						</GridListTile>
					)}
				</GridList>
				<div className="flex-container">
					<div className="left">
						<GridList cellHeight={350} cols={4} className={classes.gridListReleasedMovies}>
							{moviesData.map(movieData =>
								<GridListTile key={movieData.id} className="released-movie-grid-item">
									<img src={movieData.poster_url} className="movie-poster" alt={movieData.title} />
									<GridListTileBar title={movieData.title} />
								</GridListTile>
							)}
						</GridList>
					</div>
					<div className="right">
						<Card>
							<CardContent>
								<FormControl className={classes.formControl}>
									<Typography className={classes.title} color="textSecondary">
										FIND MOVIES BY:
									</Typography>
								</FormControl>
								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="movieName"> Movie Name:</InputLabel>
									<Input id="movieName" onChange={this.movieNameChangeHandler} />
								</FormControl>

								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="genres"> Genres:</InputLabel>
									<Select multiple
										value={this.state.genres}
										renderValue={selected => selected.join(',')}
										input={<Input id="genres" />}
										onChange={this.genreChangeHandler} >
										<MenuItem value={0}>None</MenuItem>
										{genres.map(genre => (
											<MenuItem key={genre.id} value={genre.name}>
												<Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
												<ListItemText primary={genre.name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<FormControl className={classes.formControl}>
									<InputLabel htmlFor="artists">Artists: </InputLabel>
									<Select
										multiple
										input={<Input id="artists" />}
										renderValue={selected => selected.join(',')}
										value={this.state.artists}
										onChange={this.artistChangeHandler}
									>
										<MenuItem value={0}>None</MenuItem>
										{artists.map(artist => (
											<MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
												<Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
												<ListItemText primary={artist.first_name + " " + artist.last_name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(Home);