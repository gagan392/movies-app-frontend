import React, { Component } from "react";
import { withStyles, Card, CardContent, FormControl, Typography, InputLabel, Input, Select, MenuItem, Checkbox, ListItemText, TextField, Button } from "@material-ui/core";

const styles = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 240,
		maxWidth: 240
	},
	title: {
		color: theme.palette.primary.light,
	}
});

class MovieFilters extends Component {
	render() {
		const { classes, genresList, artistsList, genresSelected, artistsSelected, genreChangeHandler, artistChangeHandler, movieNameChangeHandler } = this.props;
		return (
			<Card>
				<CardContent>
					<FormControl className={classes.formControl}>
						<Typography className={classes.title} color="textSecondary">
							FIND MOVIES BY:
						</Typography>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="movieName"> Movie Name</InputLabel>
						<Input id="movieName" onChange={movieNameChangeHandler} />
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="genres"> Genres</InputLabel>
						<Select multiple
							value={genresSelected}
							renderValue={selected => selected.join(',')}
							input={<Input id="genres" />}
							onChange={genreChangeHandler} >
							<MenuItem value={0}>None</MenuItem>
							{genresList && genresList.map(genre => (
								<MenuItem key={genre.id} value={genre.genre}>
									<Checkbox checked={genresSelected.indexOf(genre.genre) > -1} />
									<ListItemText primary={genre.genre} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="artists">Artists</InputLabel>
						<Select
							multiple
							input={<Input id="artists" />}
							renderValue={selected => selected.join(',')}
							value={artistsSelected}
							onChange={artistChangeHandler}
						>
							<MenuItem value={0}>None</MenuItem>
							{artistsList && artistsList.map(artist => (
								<MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
									<Checkbox checked={artistsSelected.indexOf(artist.first_name + " " + artist.last_name) > -1} />
									<ListItemText primary={artist.first_name + " " + artist.last_name} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl className={classes.formControl}>
						<TextField
							id="releaseDateStart"
							label="Release Date Start"
							type="date"
							defaultValue=""
							InputLabelProps={{ shrink: true }}
						></TextField>
					</FormControl>

					<FormControl className={classes.formControl}>
						<TextField
							id="releaseDateEnd"
							label="Release Date End"
							type="date"
							defaultValue=""
							InputLabelProps={{ shrink: true }}
						></TextField>
					</FormControl>

					<FormControl className={classes.formControl}>
						<Button variant="contained" color="primary"> Apply </Button>
					</FormControl>
				</CardContent>
			</Card>
		);
	}
}

export default withStyles(styles)(MovieFilters);