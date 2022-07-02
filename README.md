<tr>
<td>Google Analytics</td>
<td><a href="https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md">plugins/googleanalytics/README.md</a></td>
</tr>
</tbody>
</table>
<h2 class="code-line" data-line-start=89 data-line-end=90 ><a id="Development_89"></a>Development</h2>
<p class="has-line-data" data-line-start="91" data-line-end="92">Want to contribute? Great!</p>
<p class="has-line-data" data-line-start="93" data-line-end="95">Dillinger uses Gulp + Webpack for fast developing.<br>
Make a change in your file and instantaneously see your updates!</p>
<p class="has-line-data" data-line-start="96" data-line-end="97">Open your favorite Terminal and run these commands.</p>
<p class="has-line-data" data-line-start="98" data-line-end="99">First Tab:</p>
<pre><code class="has-line-data" data-line-start="101" data-line-end="103" class="language-sh">node app
</code></pre>
<p class="has-line-data" data-line-start="104" data-line-end="105">Second Tab:</p>
<pre><code class="has-line-data" data-line-start="107" data-line-end="109" class="language-sh">gulp watch
</code></pre>
<p class="has-line-data" data-line-start="110" data-line-end="111">(optional) Third:</p>
<pre><code class="has-line-data" data-line-start="113" data-line-end="115" class="language-sh">karma <span class="hljs-built_in">test</span>
</code></pre>
<h4 class="code-line" data-line-start=116 data-line-end=117 ><a id="Building_for_source_116"></a>Building for source</h4>
<p class="has-line-data" data-line-start="118" data-line-end="119">For production release:</p>
<pre><code class="has-line-data" data-line-start="121" data-line-end="123" class="language-sh">gulp build --prod
</code></pre>
<p class="has-line-data" data-line-start="124" data-line-end="125">Generating pre-built zip archives for distribution:</p>
<pre><code class="has-line-data" data-line-start="127" data-line-end="129" class="language-sh">gulp build dist --prod
</code></pre>
<h2 class="code-line" data-line-start=130 data-line-end=131 ><a id="Docker_130"></a>Docker</h2>
<p class="has-line-data" data-line-start="132" data-line-end="133">Dillinger is very easy to install and deploy in a Docker container.</p>
<p class="has-line-data" data-line-start="134" data-line-end="137">By default, the Docker will expose port 8080, so change this within the<br>
Dockerfile if necessary. When ready, simply use the Dockerfile to<br>
build the image.</p>
<pre><code class="has-line-data" data-line-start="139" data-line-end="142" class="language-sh"><span class="hljs-built_in">cd</span> dillinger
docker build -t &lt;youruser&gt;/dillinger:<span class="hljs-variable">${package.json.version}</span> .
</code></pre>
<p class="has-line-data" data-line-start="143" data-line-end="146">This will create the dillinger image and pull in the necessary dependencies.<br>
Be sure to swap out <code>${package.json.version}</code> with the actual<br>
version of Dillinger.</p>
<p class="has-line-data" data-line-start="147" data-line-end="150">Once done, run the Docker image and map the port to whatever you wish on<br>
your host. In this example, we simply map port 8000 of the host to<br>
port 8080 of the Docker (or whatever port was exposed in the Dockerfile):</p>
<pre><code class="has-line-data" data-line-start="152" data-line-end="154" class="language-sh">docker run <span class="hljs-operator">-d</span> -p <span class="hljs-number">8000</span>:<span class="hljs-number">8080</span> --restart=always --cap-add=SYS_ADMIN --name=dillinger &lt;youruser&gt;/dillinger:<span class="hljs-variable">${package.json.version}</span>
</code></pre>
<blockquote>
<p class="has-line-data" data-line-start="155" data-line-end="156">Note: <code>--capt-add=SYS-ADMIN</code> is required for PDF rendering.</p>
</blockquote>
<p class="has-line-data" data-line-start="157" data-line-end="159">Verify the deployment by navigating to your server address in<br>
your preferred browser.</p>
<pre><code class="has-line-data" data-line-start="161" data-line-end="163" class="language-sh"><span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8000</span>
</code></pre>
<h2 class="code-line" data-line-start=164 data-line-end=165 ><a id="License_164"></a>License</h2>
<p class="has-line-data" data-line-start="166" data-line-end="167">MIT</p>
<p class="has-line-data" data-line-start="168" data-line-end="169"><strong>Free Software, Hell Yeah!</strong></p>