---
layout: page
title: Prekenoverzicht
pageClass: sermons
---

Een overzicht van preken, Bijbelteksten en eventuele verdiepende blogposts.

<div class="sermon-tools" id="sermon-filters" role="region" aria-label="Preken zoeken">
	<div class="filter-heading">
		<strong>Preken zoeken</strong>
		<span>Zoek op jaar, Bijbeltekst of titel.</span>
	</div>
	<div class="filter-group filter-search">
		<label for="sermon-search">Zoeken</label>
		<input id="sermon-search" type="search" placeholder="Bijbeltekst of titel" autocomplete="off" />
	</div>
	<button class="filter-reset" id="sermon-reset" type="button">Wis zoekopdracht</button>
</div>

<p class="sermon-count" id="sermon-count" aria-live="polite">Alle {{ preken.size }} preken</p>
<p class="sermon-empty" id="sermon-empty" hidden>Geen preken gevonden. Probeer een andere zoekterm.</p>

<div class="sermon-table-wrap">
	<table class="sermon-table" id="sermon-table">
		<caption class="sr-only">Overzicht van preken met Bijbelteksten, opnames en verdiepende blogposts</caption>
		<thead>
			<tr>
				<th scope="col">Datum</th>
				<th scope="col">Bijbeltekst</th>
				<th scope="col">Titel</th>
				<th scope="col">Opname</th>
				<th scope="col">Blogpost</th>
			</tr>
		</thead>
		<tbody>
			{%- assign previousYear = "" -%}
			{%- for sermon in preken -%}
			{%- if sermon.year != previousYear -%}
			<tr class="sermon-year-row" data-year-row="{{ sermon.year }}">
				<th colspan="5" scope="rowgroup">{{ sermon.year }}</th>
			</tr>
			{%- assign previousYear = sermon.year -%}
			{%- endif -%}
			<tr class="sermon-row" data-sermon-row data-year="{{ sermon.year }}" data-search="{{ sermon.year }} {{ sermon.date }} {{ sermon.bibleText }} {{ sermon.title }}">
				<td>{{ sermon.date }}</td>
				<td>{{ sermon.bibleText }}</td>
				<td>{{ sermon.title | default: "—" }}</td>
				<td class="sermon-action-cell"><a class="sermon-icon-link" href="{{ sermon.videoUrl }}" target="_blank" rel="noopener noreferrer" aria-label="Bekijk opname van {{ sermon.title | default: sermon.bibleText }}" title="Bekijk opname"><img class="sermon-icon sermon-youtube-icon" src="{{ pathPrefix }}/assets/img/icons/youtube.svg" alt="YouTube" /></a></td>
				<td class="sermon-action-cell">{%- if sermon.blogUrl -%}<a class="sermon-icon-link" href="{{ pathPrefix }}{{ sermon.blogUrl }}" aria-label="Lees blogpost over {{ sermon.title | default: sermon.bibleText }}" title="Lees blogpost"><img class="sermon-icon sermon-blog-icon" src="{{ pathPrefix }}/assets/img/icons/blog.svg" alt="Blogpost" /></a>{%- else -%}<span class="sermon-no-link" aria-label="Geen blogpost">—</span>{%- endif -%}</td>
			</tr>
			{%- endfor -%}
		</tbody>
	</table>
</div>

<script>
	(() => {
		const searchInput = document.getElementById("sermon-search");
		const resetButton = document.getElementById("sermon-reset");
		const table = document.getElementById("sermon-table");
		const countElement = document.getElementById("sermon-count");
		const emptyElement = document.getElementById("sermon-empty");

		if (!searchInput || !resetButton || !table || !countElement || !emptyElement) {
			return;
		}

		const rows = Array.from(table.querySelectorAll("[data-sermon-row]"));
		const yearRows = Array.from(table.querySelectorAll("[data-year-row]"));

		function normalize(value) {
			return String(value || "").toLowerCase().trim();
		}

		function applySearch() {
			const query = normalize(searchInput.value);
			const visibleYears = new Set();
			let visible = 0;

			rows.forEach((row) => {
				const show = !query || normalize(row.dataset.search).includes(query);
				row.hidden = !show;
				if (show) {
					visible += 1;
					visibleYears.add(row.dataset.year);
				}
			});

			yearRows.forEach((row) => {
				row.hidden = !visibleYears.has(row.dataset.yearRow);
			});

			const total = rows.length;
			countElement.textContent = !query ? `Alle ${total} preken` : `${visible} van ${total} preken`;
			emptyElement.hidden = visible !== 0;
		}

		searchInput.addEventListener("input", applySearch);
		resetButton.addEventListener("click", () => {
			searchInput.value = "";
			applySearch();
			searchInput.focus();
		});

		applySearch();
	})();
</script>
