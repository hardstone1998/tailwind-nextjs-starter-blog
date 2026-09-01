import type { ProfessionalProject } from './professionalProjects'

export const professionalProjectEnglish: Record<string, Partial<ProfessionalProject>> = {
  'video-creation-agent': {
    title: 'Video creation agent',
    role: 'Agent workflow design and development',
    summary:
      'Exploring a controllable, human-in-the-loop workflow from creative clarification to shot generation.',
    responsibilities: [
      'Map dependencies between creative confirmation, script generation, asset planning and shot generation.',
      'Design agent-coordinated creation with control points for human confirmation and selective regeneration.',
    ],
    methods: ['Agent', 'Creative workflow', 'Script generation', 'Asset planning', 'Video shots'],
  },
  'video-redraw-pipeline': {
    title: 'Video redraw pipeline',
    role: 'Generative video pipeline development',
    summary:
      'Break existing video assets into an editable, shot-level production pipeline and reconstruct a new final video.',
    responsibilities: [
      'Design the pipeline from asset-library parsing and shot scripts to asset images and generated shots.',
      'Organize intermediate shot assets and final composition so the pipeline can be debugged and iterated.',
    ],
    methods: [
      'Video parsing',
      'Shot scripts',
      'Image generation',
      'Video generation',
      'Final composition',
    ],
  },
  'translation-quality-system': {
    title: 'Multilingual translation quality system',
    role: 'Three-stage translation agent, title RM / RL and quality feedback loop',
    summary:
      'Build a multilingual quality system for title and subtitle translation, from generation and diagnosis through targeted repair, human feedback and training-data feedback.',
    background:
      'The business needed to deliver Chinese or English content into multiple target languages continuously. Localized titles must remain faithful to the story while fitting local expression and market expectations. Subtitles add alignment, terminology, reading-speed, punctuation and locale constraints. With one-pass model output, translators had to discover and correct most problems manually, while issue reports, final adoption and model versions were not consistently connected. The project therefore created a three-stage subtitle agent and a separate title candidate-selection pipeline, joined by translator feedback, real adoption and manual-edit data.',
    architecture: [
      'Subtitles: source lines, timing and glossary → locale routing and context → first-pass translation → reflection and diagnosis → targeted improvement → deterministic checks and locale post-processing → delivery.',
      'Titles: source title, synopsis and market requirements → multi-strategy candidate generation → length and hard-risk filters → multidimensional LLM / RM evaluation → weighted ranking and human adoption → actual published title.',
      'Reliability: line protocol and subtitle IDs → CPS, terminology and script-leakage checks → model failover and graceful degradation → stage logs, token and correction records → independent locale configuration.',
      'Quality loop: translator issue reports, title adoption, actual adopted titles, subtitle line edit rate and whole-episode no-edit rate → error labeling and cleaning → regression, RM / RL and prompt data → offline evaluation and production feedback.',
    ],
    responsibilities: [
      'Introduce a translation–reflection–improvement agent into subtitle production: diagnose mistranslation, omission, terminology, alignment, CPS and locale issues, then repair only affected lines.',
      'Design title candidate generation, hard quality filters, multidimensional LLM scoring and weighted selection; train a reward model from preference and adoption data and use its reward signal for RL optimization.',
      'Build proactive feedback and data ingestion that joins translator issues, final human versions and adopted titles with locale, model and strategy versions for evaluation, training and regression.',
      'Track title adoption, subtitle line edits, whole-episode no-edit rate and severe-error categories to compare agent, prompt, rule, RM and RL versions by locale.',
    ],
    detailSections: [
      {
        title: 'Three-stage subtitle agent and targeted repair',
        paragraphs: [
          'The central subtitle change was to split one-pass translation into three explicit responsibilities. Stage one translates from the source, context, glossary and locale instructions. Stage two reads source and draft together and diagnoses semantic errors, omissions, line misalignment, terminology, CPS and locale expression. Stage three receives that report and returns only lines that need correction, merging them by index. When reflection finds no issue, improvement can be skipped so a correct translation is not rewritten merely for style.',
          'Deterministic safeguards remain around the agent. Glossary matches flow through translation and repair; a shared line protocol protects subtitle IDs; CPS and locale rules provide fast checks; post-processing normalizes punctuation and format. Each LLM stage has failover, while reflection or improvement failure degrades to the first-pass result instead of failing the service. Metadata records stage calls, correction counts, attempts and tokens for quality and cost diagnosis.',
        ],
      },
      {
        title: 'Title candidates, reward modeling and reinforcement learning',
        paragraphs: [
          'Title localization is treated as candidate generation and selection rather than literal one-pass translation. The system combines the source title, synopsis and market requirements to produce candidates from multiple strategies, then deduplicates them and applies length and hard-risk filters. LLM evaluation covers semantic fidelity, target-language naturalness, genre and market fit, appeal, distinctiveness and safety. Program code recomputes weighted scores and retains candidates, component judgments and the final decision.',
          'Translator choices, actual adopted titles and related preferences become training data for a reward model. The RM participates in candidate evaluation and provides reward signals for reinforcement-learning updates to generation and ranking. This lets the system learn adoption preferences across locales instead of copying surface wording. Human selection remains in the loop, and actual adoption is used to test whether model reward agrees with production decisions.',
        ],
      },
      {
        title: 'Translator feedback and the production data loop',
        paragraphs: [
          'The feedback process proactively captures issues found by translators, including the affected line, category, severity, before-and-after text and resolution. The title path stores candidates, recommendations, adoption decisions and the actual adopted title. The subtitle path stores line edits and whether an entire episode required no changes. Task, locale, model, prompt, agent and rule versions connect each human action to the strategy that produced it.',
          'After sensitive or invalid changes are filtered, high-risk mistranslations, omissions, relationships, numbers, terminology, alignment, CPS and expression issues become regression cases. Title choices feed RM / RL and candidate ranking; subtitle edit pairs improve diagnosis, targeted repair and locale rules. Whole-episode no-edit examples guard stable cases against regression. New strategies are replayed offline before later production metrics determine whether they remain enabled.',
        ],
      },
      {
        title: 'Evaluation and continuous iteration',
        paragraphs: [
          'For titles, candidate usability, recommendation adoption and the actual adopted title indicate whether the model supports production decisions. For subtitles, line edit rate measures human rework and whole-episode no-edit rate measures directly deliverable episodes. Severe mistranslation, omission, terminology and alignment categories remain separate so low character-level edit volume cannot hide a small number of high-risk failures.',
          'Metrics are segmented by locale and version. Shared samples compare direct translation, the three-stage agent, prompt changes, deterministic rules and trained-model versions. Failures enter a fixed regression set; after a prompt, rule, RM or RL change, tests also check for regressions in other locales and issue categories. This turns scattered human corrections into a repeatable optimization process.',
        ],
      },
    ],
    methods: [
      'Three-stage Translation Agent',
      'Multilingual routing',
      'CPS / terminology / line protocol',
      'Multidimensional LLM evaluation',
      'Reward Model / RL',
      'Candidate ranking',
      'Proactive feedback',
      'Regression evaluation',
    ],
    outcomes: [
      'The first title-translation version used multiple candidates and weighted LLM evaluation; reported production adoption was 42%.',
      'Reported adoption increased to 70% after introducing the reward model. Later iterations exceeded 85% for some languages, averaging about 75%.',
      'RM and RL iterations produced more usable and diverse title candidates with less repetition, while actual adopted titles continued to calibrate reward and ranking.',
      'After introducing the three-stage subtitle agent, reported character edit rates decreased from direct translation across the five locales with stage data: Arabic, Hindi, Japanese, Portuguese and Turkish. This measures rework and is used alongside severe-error categories.',
      'Established a data loop spanning translator issues, title adoption, actual adopted titles, subtitle line edits and whole-episode no-edit outcomes for ongoing prompt, rule, agent, RM and RL regression and optimization.',
    ],
  },
  'asr-platform-engineering': {
    title: 'ASR performance and shared AI platform',
    role: 'ASR serving, evaluation and AI platform development',
    summary:
      'Improve multiprocess inference and audio transfer, collect Chinese, English, Sichuan-dialect and business audio, build API-based model evaluation, and provide shared platform integration.',
    background:
      'The business needed both real-time transcription and processing of existing recordings. More model instances alone did not resolve lock contention, interprocess audio transfer or preprocessing waits. Recognition quality across Chinese, English, Sichuan dialect and business recordings also needed measurement. The work therefore covered service performance, labeled audio evaluation and platform integration with RAG and agents.',
    architecture: [
      'Live transcription: WebSocket audio → bounded queue → VAD and streaming ASR → punctuation and timestamps → incremental and final transcripts.',
      'File transcription: HTTP upload or audio URL → preprocessing → model factory and multiprocess workers → transcript; long-running business jobs use Kafka and callbacks.',
      'Model evaluation: three Chinese and three English open datasets, Sichuan dialect and business recordings → organization and human labeling → ASR model APIs → comparison with reference transcripts.',
      'Platform integration: unified API and authentication → company, business, model and agent configuration → ASR / LLM / RAG / TTS → usage records, tracing and failed-task handling.',
    ],
    responsibilities: [
      'Accelerate ASR serving and concurrency by adjusting lock granularity, workers, shared-memory transfer and multi-device scheduling, with load testing.',
      'Collect three Chinese and three English open datasets plus Sichuan-dialect and business audio, create human labels, and build evaluation against different ASR model APIs.',
      'Build shared model and agent integration, knowledge retrieval, API-key authentication, business configuration and usage management, including asynchronous transcription and callbacks.',
    ],
    detailSections: [
      {
        title: 'ASR acceleration and concurrency',
        paragraphs: [
          'The goal was faster audio processing while maintaining useful capacity under concurrent requests. The FastAPI and FunASR service supports WebSocket streaming and HTTP file transcription, with VAD, punctuation, timestamps and optional speaker recognition.',
          'A factory-wide lock initially constrained model parallelism. Iteration narrowed locking to model instances and explored batching. When gains remained limited, that batching mechanism was removed and multiprocessing workers were introduced with a model factory, task and result queues, and multi-GPU deployment. VAD, punctuation and timestamp components were also moved into multi-instance queue management to avoid shifting the bottleneck downstream.',
          'SharedMemory stores streaming audio, while queues primarily carry task information, memory names and lengths. This reduces Base64 encoding and large queue payloads. The main process reclaims memory on completion, errors and shutdown. Workers still copy an array after reading; the change mainly reduces encoding and interprocess transport overhead.',
          'Entry-point semaphores control concurrency; bounded AnyIO audio queues coordinate receiving and processing, with separate limits for conversion. Asynchronous file operations, protected task/statistics state and CPU thread limits reduce event-loop blocking and contention. Later work added readiness checks, statistics, worker monitoring and restart, plus startup and shutdown resource management.',
          'Load tests used different concurrency levels and model/device configurations, observing total time, request latency, queue waits, CPU, memory and GPU use. Recognition quality was evaluated separately from service performance.',
        ],
      },
      {
        title: 'Evaluation data and human labeling',
        paragraphs: [
          'Three Chinese and three English open datasets were supplemented with Sichuan-dialect and business recordings. Open datasets cover general recognition, while dialect and business audio address situations underrepresented in generic corpora.',
          'Audio was organized and manually labeled to pair each sample with a reference transcript, creating a shared comparison basis for models.',
        ],
      },
      {
        title: 'Recognition evaluation through model APIs',
        paragraphs: [
          'The evaluation program calls ASR model APIs, sends audio and compares returned transcripts with human references. API integration decouples evaluation from individual model internals.',
          'Models are compared on shared Chinese, English, Sichuan-dialect and business samples. Recognition evaluation addresses suitability for a corpus; load testing addresses speed and capacity. Both inform model selection and optimization.',
        ],
      },
      {
        title: 'Shared AI platform and business integration',
        paragraphs: [
          'The platform mediates between business systems and AI capabilities. FastAPI exposes chat, RAG, transcription and speech synthesis. Company, business, model, agent, prompt and knowledge-base settings are centralized to reduce repeated integration work.',
          'API-key authentication, expiry checks and authentication caching pass identity into request handling. Model usage and consumption are recorded by business and subaccount, with model pricing, balance checks and debits. Idempotent writes and database row locks handle duplicated usage records and concurrent balance updates.',
          'LangChain, LangGraph and Milvus connect document processing, embeddings, retrieval and generation. Vector and hybrid retrieval, reranking, query rewriting, persistent conversation state and prompt configuration support multi-turn RAG. Company and document metadata constrain retrieval scope.',
          'Kafka receives asynchronous speech tasks and connects audio download, segmentation or channel splitting, ASR, result assembly and callbacks. Retries, a dead-letter queue and reprocessing support investigation and compensation. Trace IDs, structured logs, Langfuse and health checks support diagnosis.',
        ],
      },
    ],
    methods: [
      'FunASR',
      'Multiprocessing / multi-GPU',
      'SharedMemory',
      'Asyncio / AnyIO',
      'ASR evaluation',
      'FastAPI',
      'LangGraph / Milvus',
      'Kafka',
      'AI platform',
    ],
    outcomes: [
      'Built live and file transcription serving with model parallelism, audio transport, preprocessing and runtime management considered together.',
      'In historical author-reported tests at 50 concurrent requests, RTF decreased from 0.61 to 0.23 and average queue latency from 1273ms to 187ms, comparing a single-GPU baseline with dual GPUs and software changes. These results combine hardware expansion and software optimization, not an isolated shared-memory gain.',
      'Established an evaluation basis covering Chinese, English, Sichuan dialect and business audio, with model APIs compared against human references.',
      'Integrated ASR, RAG, agents and model-call management into shared business access, usage management and asynchronous task handling.',
    ],
  },
  'multimodal-platform-capabilities': {
    title: 'Industry multimodal platform',
    role: 'Platform capability development',
    summary:
      'Deliver reusable multilingual document parsing, speech recognition, visual retrieval and LLM text-understanding capabilities.',
    background:
      'Provide document parsing, content retrieval, transcription and text understanding for industry users handling multilingual documents, audiovisual material and images, improving processing efficiency and accessibility.',
    architecture: [
      'Documents: multi-engine OCR routing → language detection and layout reconstruction → structured extraction / DocVQA.',
      'Speech: Whisper large-v3 → LoRA adaptation for smaller languages and domain terms → streaming segmentation and endpoint detection → inference serving.',
      'Vision: ResNetV2-50 / CLIP features → Milvus GPU index → inverted and vector hybrid retrieval.',
      'Applications: Qwen / GPT prompt-based classification → FastAPI → containers, staged rollout, monitoring and fallback.',
    ],
    responsibilities: [
      'Integrate PP-OCR, EasyOCR and MinerU for multilingual OCR routing, layout reconstruction, structured extraction and DocVQA.',
      'Adapt Whisper large-v3 with LoRA for smaller languages and domain terminology, and deploy streaming segmentation and endpoint detection.',
      'Extract ResNetV2-50 / CLIP features into Milvus for image-to-image, text-to-image and document-cover retrieval.',
      'Explore Qwen / GPT prompt-based classification for unlabeled cold starts, with containers, staged rollout, monitoring and fallback.',
    ],
    methods: [
      'OCR / DocVQA',
      'Whisper + LoRA',
      'CTranslate2',
      'CLIP / ResNet',
      'Milvus',
      'LLM classification',
      'FastAPI',
    ],
    outcomes: [
      'Reported structured-field accuracy improved by 9.8% after unifying multilingual recognition and layout reconstruction.',
      'Reported end-to-end P95 for smaller-language ASR decreased by 28%, with QPS increasing 1.4×.',
      'Reported P99 for visual retrieval over ten million vectors was under 120ms; hybrid retrieval reduced false matches.',
    ],
  },
  'intelligent-customer-service': {
    title: 'Intelligent cultural-service support',
    role: 'Project owner / end-to-end development',
    summary:
      'Own the ASR, RAG/agent, LLM and TTS support pipeline, including telephony, model serving, evaluation and data tools.',
    background:
      'Build an automated voice support system for frequent cultural-service inquiries, replacing part of the human-agent workload. The pipeline runs from telephone speech to spoken replies and creates data for knowledge updates, model iteration and quality assessment.',
    architecture: [
      'Telephony: FreeSWITCH → WebSocket streaming → ASR transcription and VAD segmentation.',
      'Answering: intent recognition → LlamaIndex / Milvus retrieval and tools → Qwen / ChatGLM response.',
      'Speech output: Edge-TTS / VITS → telephony response; 3D-Speaker supports identity and multiple speakers.',
      'Quality loop: tracing and replay → ASR / QA labeling → training data, experiment configuration and prompt versioning.',
    ],
    responsibilities: [
      'Build retrieval, tool routing and multi-turn QA with LlamaIndex and Milvus; design system prompts and few-shot templates, and evaluate recall, coverage and hallucinations.',
      'Adapt Whisper large-v2 with LoRA, optimize CTranslate2 INT8 inference, and deploy ChatGLM LoRA intent recognition and Qwen services.',
      'Combine 3D-Speaker and VAD for segmentation, speaker separation, identity checks and blocklists; use Edge-TTS and VITS for speech and voice adaptation.',
      'Integrate FreeSWITCH and a WebSocket ASR → RAG/agent → LLM → TTS pipeline, with tracing, replay, labeling and prompt-version tools.',
    ],
    methods: [
      'Whisper + LoRA',
      'RAG / Agent',
      'LlamaIndex',
      'Milvus',
      'Qwen / ChatGLM',
      '3D-Speaker + VAD',
      'FreeSWITCH',
      'Edge-TTS / VITS',
    ],
    outcomes: [
      'Reported retrieval recall@20 improved by 12%, with hallucinations reduced by 18%.',
      'Reported domain ASR accuracy increased from 87% to 93%; inference P95 fell 37%, memory 30%, and throughput increased 1.6×.',
      'Reported errors with overlapping speakers decreased by 22%, and speech-synthesis blind-test MOS increased by 0.3.',
      'Reported peak end-to-end QPS reached 120, with P99 of 850ms.',
    ],
  },
}
export function localizeProject(
  project: ProfessionalProject,
  language: 'zh' | 'en'
): ProfessionalProject {
  return language === 'en'
    ? {
        ...project,
        ...professionalProjectEnglish[project.id],
        confidentialityNotice:
          'Business names, data and implementation details have been abstracted and redacted.',
        relatedBlogs: project.relatedBlogs?.map((link) => ({
          ...link,
          title: relatedTitles[link.href] ?? link.title,
        })),
        relatedLabs: project.relatedLabs?.map((link) => ({
          ...link,
          title: relatedTitles[link.href] ?? link.title,
        })),
      }
    : project
}
const relatedTitles: Record<string, string> = {
  '/blog/2026-08-04-production-llm-subtitle-translation':
    'Production LLM subtitle translation · Chinese original',
  '/blog/2026-08-06-production-llm-subtitle-translation-en':
    'Production LLM subtitle translation · English',
  '/blog/2025-12-14-funasr-performance-optimization-shared-memory':
    'FunASR: shared memory and concurrency · Chinese original',
  '/blog/funasr-deployment-pitfall-guide-cpu-thread-explosion-memory-overflow':
    'Debugging multiprocess FunASR deployment · Chinese original',
  '/blog/python-multiprocessing-multi-model-deploy':
    'Multiprocess multi-model deployment in Python · Chinese original',
  '/blog/webnovel-title-localization-lab': 'WebNovel Title Localization Lab · Chinese original',
}
