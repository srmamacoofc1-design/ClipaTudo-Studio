import assert from 'node:assert/strict';
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
const config=JSON.parse(readFileSync(join(root,'clipatudo/distribution.json'),'utf8').replace(/^\uFEFF/,''));
assert.equal(config.editor,'Agentcut');
assert.equal(existsSync(join(root,'public/clipatudo')),false,'The separate preview must not be distributed.');
for(const folder of [config.projectMetadata,config.editingStyles]){
  const names=readdirSync(join(root,folder),{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).sort();
  assert.deepEqual(names,[...config.projects].sort(),`Unexpected projects/styles in ${folder}`);
}
for(const slug of config.projects){
  const file=join(root,config.projectMetadata,slug,'project.json');
  const p=JSON.parse(readFileSync(file,'utf8').replace(/^\uFEFF/,''));
  assert.equal(p.name,`ClipaTudo — ${slug[0].toUpperCase()+slug.slice(1)}`);
  assert.ok(existsSync(join(root,config.projectMetadata,slug,'layers.json')));
}
console.log('Distribution OK: Agentcut + toguro + vinheteiro.');
