/* Miguel Jarama — Portfolio interactions (vanilla JS, no dependencies) */
(function () {
	'use strict';

	var docEl = document.documentElement;

	/* ---------- Footer year ---------- */
	var yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());

	/* ---------- Theme toggle ---------- */
	var themeToggle = document.getElementById('theme-toggle');
	function applyTheme(dark, persist) {
		docEl.classList.toggle('dark', dark);
		if (persist) {
			try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
		}
		var meta = document.querySelector('meta[name="theme-color"]');
		if (meta) meta.setAttribute('content', dark ? '#0e1512' : '#2f6b4f');
	}
	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			applyTheme(!docEl.classList.contains('dark'), true);
		});
	}
	applyTheme(docEl.classList.contains('dark'), false);

	/* ---------- Header shadow on scroll ---------- */
	var header = document.querySelector('.site-header');
	function onScroll() {
		if (header) header.classList.toggle('scrolled', window.scrollY > 8);
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	/* ---------- Mobile navigation ---------- */
	var navToggle = document.getElementById('nav-toggle');
	var nav = document.getElementById('site-nav');
	function setNav(open) {
		if (!nav || !navToggle) return;
		nav.classList.toggle('open', open);
		navToggle.classList.toggle('open', open);
		navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		navToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
		docEl.classList.toggle('nav-open', open);
	}
	if (navToggle && nav) {
		navToggle.addEventListener('click', function () {
			setNav(!nav.classList.contains('open'));
		});
		nav.addEventListener('click', function (e) {
			if (e.target && e.target.closest && e.target.closest('a')) setNav(false);
		});
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') setNav(false);
		});
	}

	/* ---------- Active nav link on scroll ---------- */
	var sections = document.querySelectorAll('main section[id]');
	var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
	if ('IntersectionObserver' in window && sections.length && navLinks.length) {
		var spy = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				var id = entry.target.id;
				navLinks.forEach(function (link) {
					link.classList.toggle('active', link.getAttribute('href') === '#' + id);
				});
			});
		}, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
		sections.forEach(function (s) { spy.observe(s); });
	}

	/* ---------- Reveal on scroll ---------- */
	var reveals = document.querySelectorAll('.reveal');
	var inView = function (el) {
		var r = el.getBoundingClientRect();
		return r.top <= window.innerHeight && r.bottom >= 0;
	};
	if ('IntersectionObserver' in window && reveals.length) {
		var revealObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
					revealObserver.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
		reveals.forEach(function (el) { revealObserver.observe(el); });
		// Safety: elements already in the viewport on load are shown immediately.
		window.addEventListener('load', function () {
			reveals.forEach(function (el) { if (inView(el)) el.classList.add('in'); });
		});
	} else {
		reveals.forEach(function (el) { el.classList.add('in'); });
	}

	/* ---------- Graceful fallback chain for project thumbnails ---------- */
	document.querySelectorAll('.project-thumb img').forEach(function (img) {
		img.addEventListener('error', function () {
			var current = img.getAttribute('src');
			var steps = [img.getAttribute('data-fallback'), img.getAttribute('data-fallback-2')];
			for (var i = 0; i < steps.length; i++) {
				if (steps[i] && steps[i] !== current) {
					img.src = steps[i];
					return;
				}
			}
			img.classList.add('is-broken');
		});
	});
})();
